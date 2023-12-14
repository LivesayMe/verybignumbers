//Stores 6 most significant digits of a number, and the exponent of the number
class LossyInt {
    constructor(value) {
        this.precision = 2;
        this.significanceThreshold = 6; 

        if (typeof value === "string") {
            //If the string contains an e, it is in scientific notation
            if (value.includes("e")) {
                const split = value.split("e");
                this.value = parseInt(split[0]);
                this.exponent = parseInt(split[1]);
            }
            //Convert to int
            this.assign(parseInt(value));
        } else {
            this.assign(value);
        }

        this.truncate = (value1, value2) => {
            //Truncate either of the values so that the resulting exponent is the same
            if (value1.exponent > value2.exponent) {
                if (value1.exponent - value2.exponent > this.significanceThreshold) {
                    return [value1, new LossyInt(0)];
                }
                //Truncate other.value to match this.exponent
                const truncatedValue = value2.value / Math.pow(10, value1.exponent - value2.exponent);
                value2.set(truncatedValue, value1.exponent);
            } else if (value1.exponent < value2.exponent) {
                if (value2.exponent - value1.exponent > this.significanceThreshold) {
                    return [new LossyInt(0), value2];
                }
                //Truncate this.value to match other.exponent
                const truncatedValue = value1.value / Math.pow(10, value2.exponent - value1.exponent);
                value1.set(truncatedValue, value2.exponent);
            } 
            return [value1, value2];
        }
    }

    set(value, exponent) {
        if (typeof value === "string") {
            this.value = parseInt(value);
        } else {
            this.value = value;
        }
        this.exponent = exponent;
    }

    assign(value) {
        const length = value.toString().split(".")[0].length;
        const retValue = value / Math.pow(10, length - 1);
        this.set(retValue, length - 1);
    }

    copy() {
        let copy = new LossyInt(0);
        copy.set(this.value, this.exponent);
        return copy;
    }

    add(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }


        const [value1, value2] = this.truncate(this, other);
        let newValue = value1.value + value2.value;
        let newExponent = value1.exponent;
        if (newValue >= 10) { 
            const length = newValue.toString().split(".")[0].length;
            newValue = newValue / Math.pow(10, length - 1);
            newExponent += length - 1;
        } else if (newValue < 1) {
            if (newValue < 0) {
                return this //TODO: Handle negative numbers
            }
            while (newValue < 1) {
                newValue *= 10;
                newExponent--;
            }
        }
        this.set(newValue, newExponent);
        return this
    }

    multiply(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }
        let newValue = this.value * other.value;
        let newExponent = this.exponent + other.exponent;
        if (newValue >= 10) { 
            const length = newValue.toString().split(".")[0].length;
            newValue = newValue / Math.pow(10, length - 1);
            newExponent += length - 1;
        }
        this.set(newValue, newExponent);
        return this
    }

    exp(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }
        //If the values are small enough, just use Math.pow
        if (this.exponent === 0 && other.exponent === 0) {
            const calc = Math.pow(this.value, other.value);
            if (!isNaN(calc) && !isFinite(calc)) {
                this.assign(calc);
                return this
            } else {
                //Too big, use the other method
            }
        }

        const valueCopy = this.value;
        const expCopy = this.exponent;

        const valueOther = other.value;
        const expOther = other.exponent;
        
        
        //a^b = 10^(b*log10(a))
        const b1 = Math.log10(valueCopy) + expCopy;
        // console.log("log(" + valueCopy.toString() + ") + " + expCopy.toString() + "=", b1)
        let resultValue = other.multiply(b1);
        // console.log("b1 * other.value=", resultValue.value + "e" + resultValue.exponent)

        //Evaluate resultValue
        let realResultValue = resultValue.value * Math.pow(10, resultValue.exponent);

        let resultExp = Math.floor(realResultValue);
        // console.log(expOther, Math.floor(resultValue), resultExp);

        // console.log(realResultValue%1)

        resultValue = Math.pow(10, realResultValue % 1);

        this.set(resultValue, resultExp);

        return this
    }

    

    tetrate(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }

        const tetrate = (value1, value2) => {
            let currentValue = value1.copy();
            for (let i = 0; i < value2-1; i++) {
                const valueCopy = value1.copy();
                currentValue = valueCopy.exp(currentValue);
                console.log(currentValue)
            }
            return currentValue;
        }

        const result = tetrate(this, other);
        this.set(result.value, result.exponent);
        
        return this
    }

    double_tetrate(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }

        const double_tetrate = (value1, value2) => {
            let currentValue = value1.copy();
            for (let i = 0; i < value2-1; i++) {
                const valueCopy = value1.copy();
                currentValue = valueCopy.tetrate(currentValue);
            }
            return currentValue;
        }

        const result = double_tetrate(this, other);
        this.set(result.value, result.exponent);
        
        return this
    }

    toString() {
        if (this.exponent === 0) {
            return this.value.toString();
        }
        let value = this.value;
        //Round
        value = Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision);

        return value.toString() + "e" + (this.exponent);
    }
}

export default LossyInt;