import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Delete ToDos', () => {

    beforeEach(async () => {
        await browser.url("/examples/react/dist/");
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