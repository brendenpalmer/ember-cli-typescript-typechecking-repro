// Types for compiled templates
declare module 'ember-cli-typescript-typechecking-repro/templates/*' {
  import { TemplateFactory } from 'htmlbars-inline-precompile';
  const tmpl: TemplateFactory;
  export default tmpl;
}
