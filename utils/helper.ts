export class Helper {
    static convertPriceToNumber(price: string): number {
        const cleaned = price.replace(/[^0-9.]/g, '');
        return parseFloat(cleaned);
    }

    static getProductDetails() {
        return {
            productName: "iPhone",
            productQuantity: "1",
            totalPrice: "$123.20"
        };
    }

    static getLoginDetails() {
        return {
            email: "pavanol@xyz.com",
            password: "test@123"
        };
    }
}