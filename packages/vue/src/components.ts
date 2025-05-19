import { h, type SetupContext } from "vue";
import type { XSLApplyImportElementAttributes, XSLApplyTemplatesElementAttributes, XSLAttributeElementAttributes, XSLAttributeSetElementAttributes, XSLCallTemplateElementAttributes, XSLChooseElementAttributes, XSLCommentElementAttributes, XSLCopyElementAttributes, XSLCopyOfElementAttributes, XSLDecimalFormatElementAttributes, XSLElementElementAttributes, XSLFallbackElementAttributes, XSLForEachElementAttributes, XSLIfElementAttributes, XSLImportElementAttributes, XSLIncludeElementAttributes, XSLKeyElementAttributes, XSLMessageElementAttributes, XSLNamespaceAliasElementAttributes, XSLNumberElementAttributes, XSLOtherwiseElementAttributes, XSLOutputElementAttributes, XSLParamElementAttributes, XSLPreserveSpaceElementAttributes, XSLProcessingInstructionElementAttributes, XSLSortElementAttributes, XSLStripSpaceElementAttributes, XSLStylesheetElementAttributes, XSLTemplateElementAttributes, XSLTextElementAttributes, XSLTransformElementAttributes, XSLValueOfElementAttributes, XSLVariableElementAttributes, XSLWhenElementAttributes, XSLWithParamElementAttributes } from "@zfeed/xsl";

function xsl<T extends Record<string, any>>(name: string) {
    return (props: T, { slots }: Omit<SetupContext, "expose">) => h(`xsl:${name}`, props, slots.default?.());
}

export const XslApplyImport = xsl<XSLApplyImportElementAttributes>("apply-import");
export const XslApplyTemplates = xsl<XSLApplyTemplatesElementAttributes>("apply-templates");
export const XslAttributeSet = xsl<XSLAttributeSetElementAttributes>("attribute-set");
export const XslAttribute = xsl<XSLAttributeElementAttributes>("attribute");
export const XslCallTemplate = xsl<XSLCallTemplateElementAttributes>("call-template");
export const XslChoose = xsl<XSLChooseElementAttributes>("choose");
export const XslComment = xsl<XSLCommentElementAttributes>("comment");
export const XslCopyOf = xsl<XSLCopyOfElementAttributes>("copy-of");
export const XslCopy = xsl<XSLCopyElementAttributes>("copy");
export const XslDecimalFormat = xsl<XSLDecimalFormatElementAttributes>("decimal-format");
export const XslElement = xsl<XSLElementElementAttributes>("element");
export const XslFallback = xsl<XSLFallbackElementAttributes>("fallback");
export const XslForEach = xsl<XSLForEachElementAttributes>("for-each");
export const XslIf = xsl<XSLIfElementAttributes>("if");
export const XslImport = xsl<XSLImportElementAttributes>("import");
export const XslInclude = xsl<XSLIncludeElementAttributes>("include");
export const XslKey = xsl<XSLKeyElementAttributes>("key");
export const XslMessage = xsl<XSLMessageElementAttributes>("message");
export const XslNamespaceAlias = xsl<XSLNamespaceAliasElementAttributes>("namespace-alias");
export const XslNumber = xsl<XSLNumberElementAttributes>("number");
export const XslOtherwise = xsl<XSLOtherwiseElementAttributes>("otherwise");
export const XslOutput = xsl<XSLOutputElementAttributes>("output");
export const XslParam = xsl<XSLParamElementAttributes>("param");
export const XslPreserveSpace = xsl<XSLPreserveSpaceElementAttributes>("preserve-space");
export const XslProcessingInstruction = xsl<XSLProcessingInstructionElementAttributes>("processing-instruction");
export const XslSort = xsl<XSLSortElementAttributes>("sort");
export const XslStripSpace = xsl<XSLStripSpaceElementAttributes>("strip-space");
export const XslStylesheet = xsl<XSLStylesheetElementAttributes>("stylesheet");
export const XslTemplate = xsl<XSLTemplateElementAttributes>("template");
export const XslText = xsl<XSLTextElementAttributes>("text");
export const XslTransform = xsl<XSLTransformElementAttributes>("transform");
export const XslValueOf = xsl<XSLValueOfElementAttributes>("value-of");
export const XslVariable = xsl<XSLVariableElementAttributes>("variable");
export const XslWhen = xsl<XSLWhenElementAttributes>("when");
export const XslWithParam = xsl<XSLWithParamElementAttributes>("with-param");
