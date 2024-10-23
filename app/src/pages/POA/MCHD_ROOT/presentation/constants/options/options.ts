import { AdminFlFields, AdminIPFields, AdminUlFields } from "../initialValues/AdminFormInitialData";
import { PrincipalInulFields, PrincipalIPFields, PrincipalUlFields } from "../initialValues/PrincipalFormInitialValues";
import { RepresentativeFilealInulFields, RepresentativeFilealUlFields, RepresentativeflFields, RepresentativeIPFields, RepresentativeUlFields } from "../initialValues/RepresentativeFormInitialValues";
import {PrincipalTypes, PrincipalULAdminTypes, RepresentativeTypes} from "./types";





export const representativeOptions = {
    [RepresentativeTypes.IP]: RepresentativeIPFields,
    [RepresentativeTypes.UL]: RepresentativeUlFields,
    [RepresentativeTypes.FL]: RepresentativeflFields,
    [RepresentativeTypes.FILINUL]: RepresentativeFilealInulFields,
    [RepresentativeTypes.FILUL]: RepresentativeFilealUlFields,
  };

export const principaloptionsvalues = {
    [PrincipalTypes.IP]: PrincipalIPFields,
    [PrincipalTypes.UL]: PrincipalUlFields,
    [PrincipalTypes.INUL]: PrincipalInulFields,
  };


export const ulAdminFields = {
    [PrincipalULAdminTypes.IP]: AdminIPFields,
    [PrincipalULAdminTypes.UL]: AdminUlFields,
    [PrincipalULAdminTypes.FL]: AdminFlFields,
  };


  // export const subPrincipalValues = {
  //   'IP': PrincipalIPFields,
  //   'UL': PrincipalUlFields,
  //   'FL': PrincipalFl,
  // }




