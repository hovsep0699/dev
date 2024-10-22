import Behavior from './parameters/Behavior';
import Appearance from './parameters/Appearance';
import { CENTER, TOP } from '../Placement';
import OrderedCount from '@distate/core/dist/domain/documents/upd/vo/good/information/OrderedCount';
import Kind from '@distate/core/dist/domain/documents/upd/vo/good/information/Kind';
import ProductCode from '@distate/core/dist/domain/documents/upd/vo/good/information/ProductCode';
import Description from '@distate/core/dist/domain/documents/upd/vo/good/information/Description';
import Sort from '@distate/core/dist/domain/documents/upd/vo/good/information/Sort';
import Article from '@distate/core/dist/domain/documents/upd/vo/good/information/Article';
import CatalogCode from '@distate/core/dist/domain/documents/upd/vo/good/information/CatalogCode';
import KindCode from '@distate/core/dist/domain/documents/upd/vo/good/information/KindCode';
import GoodInformation from '@distate/core/dist/domain/documents/upd/vo/good/GoodInformation';

class GoodInformationForm {
  static build(builder, scope) {
    const defaultBehavior = new Behavior();

    const elementsMap = {
      [Kind.field]: builder.buildSelect,
      [OrderedCount.field]: builder.buildInput,
      [ProductCode.field]: builder.buildInput,
      [Description.field]: builder.buildInput,
      [Sort.field]: builder.buildInput,
      [Article.field]: builder.buildInput,
      [CatalogCode.field]: builder.buildInput,
      [KindCode.field]: builder.buildInput
    };
    const appearance = new Appearance({
      align: CENTER,
      width: '600px',
      noCaption: true
    });
    const behavior = new Behavior({
      ...defaultBehavior,
      scope
    });
    const defaultFieldBehavior = new Behavior({
      ...defaultBehavior,
      errorPath: scope
    });
    const fieldsBehaviors = {
      [Kind.field]: new Behavior({
        ...defaultFieldBehavior,
        initialFieldDomain: { value: null }
      }),
      [OrderedCount.field]: defaultFieldBehavior,
      [ProductCode.field]: defaultFieldBehavior,
      [Description.field]: defaultFieldBehavior,
      [Sort.field]: defaultFieldBehavior,
      [Article.field]: defaultFieldBehavior,
      [CatalogCode.field]: defaultFieldBehavior,
      [KindCode.field]: defaultFieldBehavior
    };
    const defaultFieldAppearance = new Appearance({ align: TOP });
    const fieldsAppearances = {
      [Kind.field]: new Appearance({
        align: TOP,
        isInDiv: true
      }),
      [OrderedCount.field]: defaultFieldAppearance,
      [ProductCode.field]: defaultFieldAppearance,
      [Description.field]: defaultFieldAppearance,
      [Sort.field]: defaultFieldAppearance,
      [Article.field]: defaultFieldAppearance,
      [CatalogCode.field]: defaultFieldAppearance,
      [KindCode.field]: defaultFieldAppearance
    };

    return builder.buildTableModal(
      GoodInformation,
      elementsMap,
      behavior,
      appearance,
      fieldsBehaviors,
      fieldsAppearances
    );
  }
}

export default GoodInformationForm;
