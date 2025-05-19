import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Complete ToDos', () => {

    beforeEach(async () => {
        await browser.url("/examples/react/dist/");
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

});