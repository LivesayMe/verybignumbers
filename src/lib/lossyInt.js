//Stores 6 most significant digits of a number, and the exponent of the number
class LossyInt {
    constructor(value) {
        this.precision = 2;

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
                if (value1.exponent - value2.exponent > 6) {
                    return [value1, new LossyInt(0)];
                }
                //Truncate other.value to match this.exponent
                let valueString = value2.value.toString();
                if (valueString.length < 6) {
                    //Pad with 0s until it is 6 digits long
                    valueString = valueString.padStart(6, "0")
                }
                const truncatedValue = valueString.slice(0, 6 - (value1.exponent - value2.exponent));
                console.log(truncatedValue)
                value2.set(truncatedValue, value1.exponent);
            } else if (value1.exponent < value2.exponent) {
                if (value2.exponent - value1.exponent > 6) {
                    return [new LossyInt(0), value2];
                }
                //Truncate this.value to match other.exponent
                const truncatedValue = value1.value.toString().slice(0, 6 - (value2.exponent - value1.exponent));
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
        const length = value.toString().length;
        if (length > 6) {
            this.set(value.toString().slice(0, 6), length - 6);
        } else {
            this.set(value, 0);
        }
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
        const newValue = value1.value + value2.value;
        const newExponent = value1.exponent;
        if (newValue.toString().length > 6) {
            this.set(newValue.toString().slice(0, 6), newExponent + 1);
        } else {
            this.set(newValue, newExponent);
        }
        return this
    }

    multiply(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }
        const newValue = this.value * other.value;
        const newExponent = this.exponent + other.exponent;
        if (newValue.toString().length > 6) {
            this.set(newValue.toString().slice(0, 6), newExponent + 1);
        } else {
            this.set(newValue, newExponent);
        }
        return this
    }

    exp(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }
        console.log(this, other)
        //a^b = 10^(b*log10(a))
        const b1 = Math.log10(this.value) + this.exponent;
        console.log(b1);

        let result = other.multiply(new LossyInt(b1));
        console.log(result)
        //Reverse log10
        result.value = Math.pow(10, result.value);




        return this
    }

    

    tetrate(other) {
        if (typeof other === "number") {
            other = new LossyInt(other);
        } else {
            other = other.copy();
        }

        const tetrate = (value1, value2) => {
            for (let i = 0; i < value2; i++) {
                value1 = Math.pow(value1, value1);
            }
            return value1;
        }
        const newValue = tetrate(this.value, other.value);
        const newExponent = tetrate(this.exponent, other.value);
        if (newValue.toString().length > 6) {
            this.set(newValue.toString().slice(0, 5), newExponent + 1);
        } else {
            this.set(newValue.toString(), newExponent);
        }
        return this
    }

    toString() {
        if (this.exponent === 0) {
            return this.value.toString();
        }
        let value = this.value / 100000;
        //Round
        value = Math.round(value * Math.pow(10, this.precision)) / Math.pow(10, this.precision);

        return value.toString() + "e" + (this.exponent + 5);
    }
}

export default LossyInt;