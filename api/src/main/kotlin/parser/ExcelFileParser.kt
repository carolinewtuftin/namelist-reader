package io.github.carolinewtuftin.parser

import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.io.ByteArrayInputStream
import java.io.InputStream

class ExcelFileParser : NameListFileParser {
    override fun getSupportedMimeTypes(): List<String> {
        return listOf(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
    }

    override fun parseFile(bytes: ByteArray): String {
        val inputStream: InputStream = ByteArrayInputStream(bytes)
        val workbook = XSSFWorkbook(inputStream)
        val sheet = workbook.getSheetAt(0)

        val stringBuilder = StringBuilder()

        for (row in sheet) {
            for (cell in row) {
                stringBuilder.append(cell.toString()).append(" ")
            }
            stringBuilder.append("\n")
        }

        workbook.close()
        return stringBuilder.toString()
    }
}