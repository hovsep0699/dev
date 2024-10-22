/*
<СведТов НомСтр="1" НаимТов="Tovar1" ОКЕИ_Тов="114" КолТов="123" ЦенаТов="88" СтТовБезНДС="88" НалСт="18%" СтТовУчНал="5555">
  <Акциз>
  <СумАкциз>5</СумАкциз>
  </Акциз>
  <СумНал>
  <СумНал>555</СумНал>
  </СумНал>
  <СвТД ДефКодПроисх="-"/>
  <ДопСведТов НаимЕдИзм="10^3 м3"/>
</СведТов>
<СведТов НомСтр="2" НаимТов="Tovar2" ОКЕИ_Тов="166" КолТов="3" ЦенаТов="3" СтТовБезНДС="45" НалСт="20%" СтТовУчНал="43241234">
  <Акциз>
  <СумАкциз>5</СумАкциз>
  </Акциз>
  <СумНал>
  <СумНал>555</СумНал>
  </СумНал>
  <СвТД ДефКодПроисх="-"/>
  <ДопСведТов ПрТовРаб="5" НаимЕдИзм="кг"/>
</СведТов>
 */
import Name from './good/Name';
import Num from './good/Num';
import PricePerUnit from './good/PricePerUnit';
import CostBeforeTax from './good/CostBeforeTax';
import Excise from './good/Excise';
import TaxRate from '../../../common/document/TaxRate';
import AmountOfTax from './good/AmountOfTax';
import CostAfterTax from './good/CostAfterTax';
import Measurement from './measurement/Measurement';
import GoodInformation from './good/GoodInformation';
import InfoFieldFact2 from './good/InfoFieldFact2';

class Good {
  static get VOs() {
    return [Name, Measurement, Num, PricePerUnit, CostBeforeTax, Excise, TaxRate, AmountOfTax, CostAfterTax, GoodInformation, InfoFieldFact2];
  }

  static get field() {
    return 'goods';
  }
}

export default Good;
