export interface XSLApplyImportElementAttributes {}

export interface XSLApplyTemplatesElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/apply-templates#select
     */
    select?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/apply-templates#mode
     */
    mode?: string;
}

export interface XSLAttributeSetElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/attribute-set#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/attribute-set#use-attribute-sets
     */
    "use-when"?: string;
}

export interface XSLAttributeElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/attribute#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/attribute#namespace
     */
    namespace?: string;
}

export interface XSLCallTemplateElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/call-template#name
     */
    name: string;
}

export interface XSLChooseElementAttributes {}

export interface XSLCommentElementAttributes {}

export interface XSLCopyOfElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/copy-of#select
     */
    select: string;
}

export interface XSLCopyElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/copy#use-attribute-sets
     */
    "use-attribute-sets"?: string;
}

export interface XSLDecimalFormatElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#name
     */
    name?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#decimal-separator
     */
    "decimal-separator"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#grouping-separator
     */
    "grouping-separator"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#infinity
     */
    infinity?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#minus-sign
     */
    "minus-sign"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#NaN
     */
    NaN?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#percent
     */
    percent?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#per-mille
     */
    "per-mille"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#zero-digit
     */
    "zero-digit"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#digit
     */
    digit?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/decimal-format#pattern-separator
     */
    "pattern-separator"?: string;
}

export interface XSLElementElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/element#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/element#namespace
     */
    namespace?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/element#use-attribute-sets
     */
    "use-attribute-sets"?: string;
}

export interface XSLFallbackElementAttributes {}

export interface XSLForEachElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/for-each#select
     */
    select: string;
}

export interface XSLIfElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/if#test
     */
    test: string;
}

export interface XSLImportElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/import#href
     */
    href: string;
}

export interface XSLIncludeElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/include#href
     */
    href: string;
}

export interface XSLKeyElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/key#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/key#match
     */
    match: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/key#use
     */
    use: string;
}

export interface XSLMessageElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/message#terminate
     */
    terminate?: "yes" | "no";
}

export interface XSLNamespaceAliasElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/namespace-alias#stylesheet-prefix
     */
    "stylesheet-prefix": string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/namespace-alias#result-prefix
     */
    "result-prefix": string;
}

export interface XSLNumberElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#count
     */
    count?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#level
     */
    level?: "single" | "multiple" | "any";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#from
     */
    from?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#value
     */
    value?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#format
     */
    format?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#lang
     */
    lang?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#letter-value
     */
    "letter-value"?: "alphabetic" | "traditional";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#grouping-separator
     */
    "grouping-separator"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/number#grouping-size
     */
    "grouping-size"?: string;
}

export interface XSLOtherwiseElementAttributes {}

export interface XSLOutputElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#method
     */
    method?: "xml" | "html" | "text";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#version
     */
    version?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#encoding
     */
    encoding?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#omit-xml-declaration
     */
    "omit-xml-declaration"?: "yes" | "no";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#standalone
     */
    standalone?: "yes" | "no";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#doctype-public
     */
    "doctype-public"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#doctype-system
     */
    "doctype-system"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#cdata-section-elements
     */
    "cdata-section-elements"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#indent
     */
    indent?: "yes" | "no";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/output#media-type
     */
    "media-type"?: string;
}

export interface XSLParamElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/param#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/param#select
     */
    select?: string;
}

export interface XSLPreserveSpaceElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/preserve-space#elements
     */
    elements: string;
}

export interface XSLProcessingInstructionElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/processing-instruction#name
     */
    name: string;
}

export interface XSLSortElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/sort#select
     */
    select?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/sort#order
     */
    order?: "ascending" | "descending";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/sort#case-order
     */
    "case-order"?: "upper-first" | "lower-first";
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/sort#lang
     */
    lang?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/sort#data-type
     */
    "data-type"?: "text" | "number";
}

export interface XSLStripSpaceElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/strip-space#elements
     */
    elements: string;
}

export interface XSLStylesheetElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#version
     */
    version: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#exclude-result-prefixes
     */
    "exclude-result-prefixes"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#extension-element-prefixes
     */
    "extension-element-prefixes"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#default-collation
     */
    "default-collation"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#default-mode
     */
    "default-mode"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#default-validation
     */
    "default-validation"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#expand-text
     */
    "expand-text"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#id
     */
    id?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#input-type-annotations
     */
    "input-type-annotations"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#use-when
     */
    "use-when"?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/stylesheet#xpath-default-namespace
     */
    "xpath-default-namespace"?: string;
}

export interface XSLTemplateElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/template#match
     */
    match?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/template#name
     */
    name?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/template#mode
     */
    mode?: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/template#priority
     */
    priority?: string;
}

export interface XSLTextElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/text#disable-output-escaping
     */
    "disable-output-escaping"?: "yes" | "no";
}

export type XSLTransformElementAttributes = XSLStylesheetElementAttributes;

export interface XSLValueOfElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/value-of#select
     */
    select: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/value-of#disable-output-escaping
     */
    "disable-output-escaping"?: "yes" | "no";
}

export interface XSLVariableElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/variable#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/variable#select
     */
    select?: string;
}

export interface XSLWhenElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/when#test
     */
    test: string;
}

export interface XSLWithParamElementAttributes {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/with-param#name
     */
    name: string;
    /**
     * @link https://developer.mozilla.org/en-US/docs/Web/XML/XSLT/Reference/Element/with-param#select
     */
    select?: string;
}
