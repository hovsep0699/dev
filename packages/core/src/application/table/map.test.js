import map from './map';
import dataItemContainerItem from '../../mocks/table/200/table_item_container_item';
import dataContainerContainer from '../../mocks/table/200/table_container_container';
import dataContainerWithOneItemInside from '../../mocks/table/200/table_container_with_one_item_inside';
import dataEmptyRows from '../../mocks/table/200/table_empty_rows';
import dataContainerItem from '../../mocks/table/200/table_container_item';
import dataItemContainer from '../../mocks/table/200/table_item_container';
import dataItemItem from '../../mocks/table/200/table_item_item';
import successDataItemContainerItem from '../../mocks/table/success/table_item_container_item';
import successDataContainerContainer from '../../mocks/table/success/table_container_container';
import successDataContainerWithOneItemInside from '../../mocks/table/success/table_container_with_one_item_inside';
import successDataEmptyRows from '../../mocks/table/success/table_empty_rows';
import successDataContainerItem from '../../mocks/table/success/table_container_item';
import successDataItemContainer from '../../mocks/table/success/table_item_container';
import successDataItemItem from '../../mocks/table/success/table_item_item';

describe('map', () => {
    test('item container item', () => expect(map(dataItemContainerItem)).toEqual(successDataItemContainerItem));
    test('item item', () => expect(map(dataItemItem)).toEqual(successDataItemItem));
    test('container container', () => expect(map(dataContainerContainer)).toEqual(successDataContainerContainer));
    test('container item', () => expect(map(dataContainerItem)).toEqual(successDataContainerItem));
    test('item container', () => expect(map(dataItemContainer)).toEqual(successDataItemContainer));
    test('container with one item inside', () => expect(map(dataContainerWithOneItemInside)).toEqual(successDataContainerWithOneItemInside));
    test('empty rows', () => expect(map(dataEmptyRows)).toEqual(successDataEmptyRows));
});
