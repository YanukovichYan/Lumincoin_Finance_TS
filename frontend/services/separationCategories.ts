import {CategoryType, Operation, SeparationCatNewObgType} from "../types";

export class SeparationCategories {

    static getSeparateCategory(operations: Operation[], removeCardId: number, categories: CategoryType[]): number {

        const newObject: SeparationCatNewObgType = operations.reduce((object: SeparationCatNewObgType, operation: Operation): SeparationCatNewObgType => {
            if (object[operation.category]) {
                object[operation.category].push(operation)
            } else {
                object[operation.category] = [operation]
            }
            return object
        }, {})

        let foundCategory: CategoryType | undefined = categories.find(category => category.id === +(removeCardId))

        let amount = 0
        if (foundCategory) {
            newObject[foundCategory.title]?.forEach(el => {
                amount += el.amount
            })
        }

        return amount
    }

}