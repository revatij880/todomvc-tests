import { $, browser } from '@wdio/globals'

class ToDoPage {
    get newToDoInput() {
        return $('#todo-input');
    }

    get todoTitle() {
        return $('h1');
    }

    get todoItems() {
        return $$('[data-testid="todo-item"]');
    }

    get firstTodoLabel() {
        return $('[data-testid="todo-item-label"]');
    }

    get toggleAllCheckbox() {
        return $('#toggle-all');
    }

    get completedFilterLink() {
        return $('a[href="#/completed"]');
    }

    get activeFilterLink() {
        return $('a[href="#/active"]');
    }

    get toggleAllLabel() {
        return $('[for="toggle-all"]');
    }

    async goToCompletedFilter() {
        await this.completedFilterLink.click();
    }

    async goToActiveFilter() {
        await this.activeFilterLink.click();
    }

    get filterSection() {
        return $('footer.footer');
    }

    get newTodoInput() {
        return $('input.new-todo');
    }

    get allTodoLabels() {
        return $$('[data-testid="todo-item-label"]');
    }

    get toggleButtons() {
        return $$('input.toggle');
    }

    async markTodosCompletedByIndexes(indexes) {
        const toggles = await this.toggleButtons;
        for (const i of indexes) {
            await toggles[i].click();
        }
    }

    async getTodoTexts() {
        const items = await this.todoItems;
        const texts = [];
        for (const item of items) {
            const label = await item.$('[data-testid="todo-item-label"]');
            texts.push(await label.getText());
        }
        return texts;
    }


    getTodoToggleByIndex(index) {
        return this.todoItems[index].$('input.toggle'); 
    }

    clickFilter(name) {
        return $(`footer .filters li a=${name}`).click(); // Filter button 'All', 'Active', 'Completed'
    }


    async clearAllTodos() {
        const items = await this.todoItems;
        for (const item of items) {
            await item.moveTo(); // hover to reveal the destroy button
            const deleteBtn = await item.$('[data-testid="todo-item-button"]');
            await deleteBtn.click();
        }
    }

    async getTodoLabelByIndex(index) {
        return await this.todoItems[index].$('[data-testid="todo-item-label"]');
    }

    async hoverOnTodoByIndex(index) {
        const items = await this.todoItems;
        await items[index].moveTo();
    }

    async deleteTodoByIndex(index) {
        const items = await this.todoItems;
        const deleteButton = await items[index].$('.destroy');
        await deleteButton.click();
    }

    async getTodoLabels() {
        const items = await this.todoItems;
        const labels = [];
        for (const item of items) {
            const label = await item.$('[data-testid="todo-item-label"]');
            labels.push(await label.getText());
        }
        return labels;
    }

    async doubleClickOnTodoItem(index) {
        const todoItemToDoubleClickOn = await this.getTodoLabelByIndex(index);
        await todoItemToDoubleClickOn.doubleClick();
    }

    async getTodoToggleByIndex(index) {
        const items = await this.todoItems;
        return await items[index].$('[data-testid="todo-item-toggle"]');
    }

    async editTodoText(index, newText) {
        await this.doubleClickOnTodoItem(index);
        await browser.pause(5000);
        const itemToEditInput = await $('[role=main]');
        await itemToEditInput.setValue(newText);
        await browser.keys('Enter');
    }

    async typeNewToDo(newToDoItem) {
        await this.newToDoInput.setValue(newToDoItem);
        await browser.keys('Enter');
    }

    async addMultipleTodos(todos = []) {
        for (const todo of todos) {
            await this.typeNewToDo(todo);
        }
    }

    async toggleAllTodos() {
        const toggleAll = await this.toggleAllCheckbox;
        await toggleAll.waitForDisplayed();
        await toggleAll.click();
    }


    // Get all checkboxes (used to mark complete)
    async getAllCheckboxes() {
        return await $$('[data-testid="todo-item"] .toggle');
    }

    // Get all visible labels (used to verify visible todos)
    async getVisibleTodoLabels() {
        return await $$('[data-testid="todo-item"]:not([style*="display: none"]) [data-testid="todo-item-label"]');
    }

    async toggleTodoByIndex(index) {
        const items = await this.todoItems;
        const checkbox = await items[index].$('input.toggle');
        await checkbox.click();
    }

    async clickClearCompleted() {
        const button = await $('button=Clear completed');
        if (await button.isDisplayed()) {
            await button.click();
        }

    }

    async getAllTodoLabels() {
        const items = await this.todoItems;
        const labels = [];

        for (const item of items) {
            const label = await item.$('[data-testid="todo-item-label"]');
            labels.push(label);
        }

        return labels;
    }
}


export default new ToDoPage(); 