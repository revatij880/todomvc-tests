import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Add ToDos', () => {

    beforeEach(async () => {
        await browser.url("/examples/react/dist/");
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

});