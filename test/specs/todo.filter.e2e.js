import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Filter ToDos', () => {

    beforeEach(async () => {
        await browser.url("/examples/react/dist/");
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
});