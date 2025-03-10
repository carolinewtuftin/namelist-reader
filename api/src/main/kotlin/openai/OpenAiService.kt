package io.github.carolinewtuftin

import com.aallam.openai.api.chat.ChatCompletion
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import io.github.carolinewtuftin.extractor.Person
import kotlinx.serialization.json.Json

const val INSTRUCTIONS =
        "Return a list of people as a json array shown in the example, based on the input from the following string. " +
        "Allow only 11 numbers in ssn no more or less, firstname and lastname is allowed special characters and -. " +
        "Do not return any other text. " +
        "Example type return: { \"ssn\": \"string\", \"firstName\": \"string\", \"lastName\": \"string\" }, " +
        "If no people are found, return an empty array. " +
        "RAW CODE ONLY, DO NOT WRAP IT IN MARKDOWN"

class OpenAiService {
    suspend fun setupAPI(): OpenAI {
        val openai =
                OpenAI(
                        token =
                                "TOKEN"
                )

        return openai
    }

    public suspend fun getResponse(prompt: String): List<Person> {
        val openai = setupAPI()

        val chatCompletionRequest =
                ChatCompletionRequest(
                        model = ModelId("gpt-3.5-turbo"),
                        messages =
                                listOf(
                                        ChatMessage(role = ChatRole.System, content = INSTRUCTIONS),
                                        ChatMessage(role = ChatRole.System, content = prompt),

                                )
                )

        val completion: ChatCompletion = openai.chatCompletion(chatCompletionRequest)
        val response: List<Person> = Json.decodeFromString(completion.choices.last().message.content ?: "")

        return response;
    }
}
