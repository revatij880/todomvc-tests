import { expect } from '@wdio/globals'
import ToDoPage from '../pageobjects/todo.page.js'

describe('Navigation', () => {

    beforeEach(async () => {
        await browser.url("/examples/react/dist/");
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

});
