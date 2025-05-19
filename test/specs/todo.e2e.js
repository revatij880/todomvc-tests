import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Manage ToDos', () => {

    beforeEach(async () => {
        await browser.url("https://todomvc.com/examples/react/dist/#/")
    });


    it('should display correct landing screen when todo list is empty', async () => {

        await browser.pause(300);
        // Assert the title/header
        const title = await $('h1');
        expect(await title.getText()).toBe('todos');

        // Assert input field is visible
        expect(await ToDoPage.newTodoInput.isDisplayed()).toBe(true);


        // Assert filter section (footer) is not visible
        expect(await ToDoPage.filterSection.isDisplayed()).toBe(false);

        // Assert no todos are listed
        const todos = await ToDoPage.todoItems;
        expect(todos.length).toBe(0);

        // Assert the placeholder text is "What needs to be done?"
        const input = await $('input.new-todo');
        const placeholder = await input.getAttribute('placeholder');
        expect(placeholder).toBe('What needs to be done?');
    });


    it('should be able to add a new todo', async () => {
        const expectedText = 'Write a test';

        await ToDoPage.typeNewToDo('Write a test')

        // Assert there is exactly 1 todo item
        const items = await ToDoPage.todoItems;
        expect(items).toBeElementsArrayOfSize(1);

        // Assert the item's text matches expected
        const label = ToDoPage.firstTodoLabel;
        await expect(label).toHaveText(expectedText);
    });

    it('should not be able to add an empty todo item', async () => {

         await ToDoPage.clearAllTodos();

        await ToDoPage.newToDoInput.click();
        await browser.keys('Enter');

        await browser.pause(300);

        const items = await ToDoPage.todoItems;
        expect(items.length).toBe(0);
    });

    it('should add todos with long text, numbers, and special characters', async () => {

        await ToDoPage.clearAllTodos();

        const todos = [
            'Given todo is visible When user double-clicks on a todo label Then the item should become editable And user should be able to modify the text and save by pressing Enter',
            '1234567890',
            'Task@@@@'
        ];

        for (const todo of todos) {
            await ToDoPage.typeNewToDo(todo);
        }

        // Assert all 3 todos are present
        const items = await ToDoPage.todoItems;
        expect(items).toBeElementsArrayOfSize(3);

        // Verify text of each item
        for (let i = 0; i < todos.length; i++) {
            const label = await ToDoPage.getTodoLabelByIndex(i);
            await expect(label).toHaveText(todos[i]);
        }
    });

    it('should allow adding duplicate todo items', async () => {

        await ToDoPage.clearAllTodos();

        const duplicateText = 'Duplicate todos';

        // Add the same todo 3 times
        await ToDoPage.typeNewToDo(duplicateText);
        await ToDoPage.typeNewToDo(duplicateText);
        await ToDoPage.typeNewToDo(duplicateText);

        // Verify 3 items are created
        const items = await ToDoPage.todoItems;
        expect(items).toBeElementsArrayOfSize(3);

        // Verify all items have the same text
        const labels = await ToDoPage.getAllTodoLabels();
        for (const label of labels) {
            await expect(label).toHaveText(duplicateText);
        }
    });

   it('should allow editing an existing todo', async () => {

        await ToDoPage.clearAllTodos();

        const originalText = 'Task 1';
        const updatedText = 'Task 2';

        await ToDoPage.typeNewToDo(originalText);

        // Double-click on the label to edit text
        const label = await ToDoPage.getTodoLabelByIndex(0);
        await label.doubleClick();

        //  Get the input value from the todo
        const todoItem = await ToDoPage.todoItems[0];
        const input = await todoItem.$('[data-testid="text-input"]');
        await input.waitForDisplayed();

        //  Remove all existing text
        const currentValue = await input.getValue();
        for (let i = 0; i < currentValue.length; i++) {
            await browser.keys('Backspace');
        }

        // Enter new value and press Enter
        await input.setValue(updatedText);
        await browser.keys('Enter');

        // Validate the updated label
        const updatedLabel = await ToDoPage.getTodoLabelByIndex(0);
        await expect(updatedLabel).toHaveText(updatedText);

        // Log to console
        console.log('Updated todo text:', await updatedLabel.getText());

    });



    it('should be able to mark multiple todos as completed', async () => {

        await ToDoPage.clearAllTodos();


        // Add 3 todos items
        const todos = ['Task 1', 'Task 2', 'Task 3'];
        await ToDoPage.addMultipleTodos(todos);


        // Mark all todos as completed
        for (let i = 0; i < todos.length; i++) {
            const toggle = await ToDoPage.getTodoToggleByIndex(i);
            await toggle.click();
        }

        await ToDoPage.goToCompletedFilter();

        const completedTodos = await ToDoPage.todoItems;
        expect(completedTodos).toBeElementsArrayOfSize(3);

        // Validate that each todo text matches
        for (let i = 0; i < todos.length; i++) {
            const label = await ToDoPage.getTodoLabelByIndex(i);
            await expect(label).toHaveText(todos[i]);
        }
    });


    it('should mark all todos as completed using toggle-all checkbox', async () => {

        await ToDoPage.clearAllTodos();

        //Add 3 todos items
        const todos = ['Task 1', 'Task 2', 'Task 3'];
        await ToDoPage.addMultipleTodos(todos);


        //Click  on toggle-all checkbox
        const toggleAll = await $('#toggle-all');
        await browser.execute(el => el.click(), toggleAll);
        await browser.pause(500);

       
        //Go to Completed filter
        await ToDoPage.goToCompletedFilter();


        //Validate all 3 todos are marked completed
        const completedItems = await ToDoPage.todoItems;
        expect(completedItems).toBeElementsArrayOfSize(3);

        //Go to Active filter
        await ToDoPage.goToActiveFilter();
        await browser.pause(500);

        // Validate no active todos are displayed
        const activeItems = await ToDoPage.todoItems;
        expect(activeItems).toBeElementsArrayOfSize(0);

    });

    it('should correctly filter completed and active todos', async () => {

        await ToDoPage.clearAllTodos();

        // Add 5 todos items
        const todos = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
        await ToDoPage.addMultipleTodos(todos);
        await browser.pause(500);

        // Mark first 2 todos as completed
        await ToDoPage.markTodosCompletedByIndexes([0, 1]);

        // Go to Completed filter
        await ToDoPage.goToCompletedFilter();
        await browser.pause(500);

        // Verify 2 todos are displayed
        const completedTodos = await ToDoPage.todoItems;
        expect(completedTodos).toBeElementsArrayOfSize(2);
        console.log("Completed Todos:");
        for (const item of completedTodos) {
            console.log(await item.getText());
        }

        // Go to Active filter
        await ToDoPage.goToActiveFilter();
        await browser.pause(500);

        // Verify 3 todos are displayed
        const activeTodos = await ToDoPage.todoItems;
        expect(activeTodos).toBeElementsArrayOfSize(3);
        console.log("Active Todos:");
        for (const item of activeTodos) {
            console.log(await item.getText());
        }
    });

    it('should not display filter section when there are no todos', async () => {

        await ToDoPage.clearAllTodos();
        await browser.pause(500);

        // Check that no todo items are displayed
        const todos = await ToDoPage.todoItems;
        expect(todos.length).toBe(0);

        // Assert that the filter section is not displayed
        const isDisplayed = await ToDoPage.filterSection.isDisplayed();
        expect(isDisplayed).toBe(false);
    });


    it('should display only completed todos when "Completed" filter is selected', async () => {

        await ToDoPage.clearAllTodos();

        const todos = ['Task 1', 'Task 2', 'Task 3'];
        for (const todo of todos) {
            await ToDoPage.typeNewToDo(todo);
        }
        await browser.pause(500);

        // Mark 2 todo items as completed 
        const checkboxes = await ToDoPage.getAllCheckboxes();
        await checkboxes[0].click();
        await checkboxes[1].click();

        await ToDoPage.goToCompletedFilter();

        await browser.pause(500);

        const visibleItems = await ToDoPage.getVisibleTodoLabels();
        const visibleTexts = [];
        for (const item of visibleItems) {
            visibleTexts.push(await item.getText());
        }

        // Validate that completed todos are visible
        expect(visibleTexts).toEqual(['Task 1', 'Task 2']);

    });

    it('should be able to delete a todo', async () => {

        await ToDoPage.clearAllTodos();

        await ToDoPage.typeNewToDo('Task 1');

        await ToDoPage.hoverOnTodoByIndex(0);
        await ToDoPage.deleteTodoByIndex(0);

        const labels = await ToDoPage.getTodoLabels();

        expect(labels).not.toContain('Task 1');
    });

    it('should be able to remove completed todos after clicking on Clear completed', async () => {
        await ToDoPage.clearAllTodos();

        await ToDoPage.typeNewToDo('Task 1');
        await ToDoPage.typeNewToDo('Task 2');

        await ToDoPage.toggleTodoByIndex(0);
        await ToDoPage.toggleTodoByIndex(1);

        // Click on "Clear completed"
        await ToDoPage.clickClearCompleted();

        // Validate no completed todos are visible
        const labels = await ToDoPage.getTodoLabels();
        expect(labels).toHaveLength(0);
    });

});
