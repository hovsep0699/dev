import { FC } from 'react';
import { TemplateBase } from './tpl.base';
import { TemplateGroup } from './tpl.group';
import { TemplateSection } from './tpl.section';

export const templates: Record<string, FC<any>> = {
  base: TemplateBase,
  group: TemplateGroup,
  section: TemplateSection
};

export default templates;
