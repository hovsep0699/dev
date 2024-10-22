export interface IMask {
  length?: number;
  fixed?: string;
  regexp?: RegExp;
  placeholder?: string;
}

/**
 * Breaks the value up into mask parts
 * @param mask Mask
 * @param value Input value
 */
const parseValue = (mask: IMask[], value: string) => {
  const valueParts: Array<{ part: string; beginIndex: number; endIndex: number }> = [];
  let valueIndex: number = 0;
  let maskIndex: number = 0;

  while (value !== undefined && valueIndex < value.length && maskIndex < mask.length) {
    const item = mask[maskIndex];
    let found;

    if (item.fixed) {
      const { length } = item.fixed;

      valueParts.push({
        part: item.fixed,
        beginIndex: valueIndex,
        endIndex: valueIndex + length - 1
      });

      const part = value.slice(valueIndex, valueIndex + length);

      if (part === item.fixed) {
        valueIndex += length;
      }

      maskIndex += 1;
      found = true;
    }

    if (!found) {
      if (item.regexp) {
        const minLength = (Array.isArray(item.length) && item.length[0]) || item.length || 1;
        const maxLength =
          (Array.isArray(item.length) && item.length[1]) ||
          item.length ||
          value.length - valueIndex;
        let length = maxLength;

        while (!found && length >= minLength) {
          const part = value.slice(valueIndex, valueIndex + length);

          if (item.regexp.test(part)) {
            valueParts.push({
              part,
              beginIndex: valueIndex,
              endIndex: valueIndex + length - 1
            });

            valueIndex += length;
            maskIndex += 1;
            found = true;
          }

          length -= 1;
        }

        if (!found) {
          valueIndex = value.length;
        }
      } else {
        const length = Array.isArray(item.length)
          ? item.length[1]
          : item.length || value.length - valueIndex;
        const part = value.slice(valueIndex, valueIndex + length);

        valueParts.push({
          part,
          beginIndex: valueIndex,
          endIndex: valueIndex + length - 1
        });

        valueIndex += length;
        maskIndex += 1;
      }
    }
  }

  return valueParts;
};

export default parseValue;
