import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Update ToDos', () => {

    beforeEach(async () => {
        await browser.url("/examples/react/dist/");
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

});