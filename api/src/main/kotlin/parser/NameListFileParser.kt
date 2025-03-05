package io.github.carolinewtuftin.parser

interface NameListFileParser {
    fun getSupportedMimeTypes(): List<String>
    fun parseFile(bytes: ByteArray): String
}