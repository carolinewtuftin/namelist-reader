package io.github.carolinewtuftin

import io.github.carolinewtuftin.service.ExcelParserService
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {

    val excelParserService = ExcelParserService()

    routing {
        get("/") {
            call.respondText(excelParserService.parseExcel())
        }
    }
}
