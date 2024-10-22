import ProductNotSubjectToLabelingOrTraceability from '../../../../common/options/ProductNotSubjectToLabelingOrTraceability';
import ProductTraceabilityInformation from '../../../../common/options/ProductTraceabilityInformation';
import ProductIdentificationNumber from '../../../../common/options/ProductIdentificationNumber';

class GoodsTraceabilityInfo {
  static get name() {
    return 'Сведения о прослеживаемости или маркировке товара';
  }

  static get field() {
    return 'goodsTraceabilityInfo';
  }

  static get options() {
    return [ProductNotSubjectToLabelingOrTraceability, ProductTraceabilityInformation, ProductIdentificationNumber];
  }
}

export default GoodsTraceabilityInfo;
