<script lang="ts" setup>
    /* eslint-disable vue/require-component-is */
    import {
        XslApplyTemplates,
        XslForEach,
        XslIf,
        XslOutput,
        XslStylesheet,
        XslTemplate,
        XslText,
        XslValueOf,
        XslVariable,
    } from "../../src";
</script>

<template>
    <xsl-stylesheet
        version="1.0"
        xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
        xmlns:atom="http://www.w3.org/2005/Atom"
    >
        <xsl-output method="html"/>
        <xsl-template match="/">
            <html lang="{atom:feed/atom:language}">
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <component is="title">
                        <xsl-value-of select="atom:feed/atom:title/"/>
                    </component>
                    <link rel="stylesheet" href="/assets/atom.css" />
                    <link rel="icon" href="{atom:feed/atom:icon}" />
                </head>
                <body>
                    <main>
                        <xsl-apply-templates select="atom:feed/atom:entry"/>
                    </main>
                </body>
            </html>
        </xsl-template>
        <xsl-template match="atom:entry">
            <a href="{atom:link/@href}">
                <xsl-variable
                    name="img-src"
                    select="substring-before(substring-after(substring-after(atom:content, '&lt;img'), 'src=&quot;'), '&quot;')"
                />
                <xsl-if test="$img-src">
                    <img class="entry-image" src="{$img-src}" alt="{atom:title}" loading="lazy"/>
                </xsl-if>
                <article>
                    <h2 class="entry-title">
                        <xsl-value-of select="atom:title" />
                    </h2>
                    <xsl-if test="atom:summary">
                        <div class="entry-summary">
                            <xsl-value-of select="atom:summary" />
                        </div>
                    </xsl-if>
                    <div class="entry-meta">
                        <xsl-variable name="published-date" select="substring(atom:published, 1, 10)" />
                        发布于 <xsl-value-of select="$published-date" />
                        <xsl-if test="atom:updated and atom:updated != atom:published">
                            <xsl-text> • 更新于 </xsl-text>
                            <xsl-value-of select="substring(atom:updated, 1, 10)" />
                        </xsl-if>
                        <xsl-if test="atom:category">
                            <xsl-text> • </xsl-text>
                            <xsl-for-each select="atom:category">
                                <xsl-value-of select="@term"/>
                            </xsl-for-each>
                        </xsl-if>
                    </div>
                </article>
            </a>
        </xsl-template>
    </xsl-stylesheet>
</template>
