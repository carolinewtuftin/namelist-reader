package io.github.carolinewtuftin

import io.github.carolinewtuftin.extractor.NamelistExtractor
import io.github.carolinewtuftin.parser.ExcelFileParser
import io.github.carolinewtuftin.parser.NameListFileParser
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    install(ContentNegotiation) { json() }
    install(CORS) {
        anyHost()
        anyMethod()
        allowHeader(HttpHeaders.ContentType)
    }

    val FILE_PARSERS: List<NameListFileParser> = listOf(ExcelFileParser())

    val extractor = NamelistExtractor()
    val openAIService = OpenAiService()

    routing {
        post("/extract") {
            val mimeType = call.request.headers["Content-Type"]
            val fileParser =
                    FILE_PARSERS.firstOrNull { x -> x.getSupportedMimeTypes().contains(mimeType) }

            if (fileParser == null) {
                call.respond(HttpStatusCode.BadRequest, "Unsupported mime type: $mimeType")
            } else {

                val bytes = call.receive<ByteArray>()

                val extractorInput = fileParser.parseFile(bytes)
                val persons = openAIService.getResponse(extractorInput)

                call.respond(Response(extractedPersons = persons, inputString = extractorInput))
            }
        }
    }
}
