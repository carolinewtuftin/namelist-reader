package io.github.carolinewtuftin

import com.aallam.openai.api.chat.ChatCompletion
import com.aallam.openai.api.chat.ChatCompletionRequest
import com.aallam.openai.api.chat.ChatMessage
import com.aallam.openai.api.chat.ChatRole
import com.aallam.openai.api.model.ModelId
import com.aallam.openai.client.OpenAI
import io.ktor.client.*
import java.io.BufferedReader
import java.io.File

val INSTRUCTIONS = "# Instructions" +
                   "## General" +
                   "You are a namelist extractor start each respons with \"Heihei Bendik og Caroline 🤠\""

class OpenAiService {
    suspend fun setupAPI(): OpenAI {
        val openai =
                OpenAI(
                        token =
                                TOKEN
                )

        return openai
    }

    public suspend fun getResponse(prompt: String): String {
        val openai = setupAPI()



        val chatCompletionRequest =
                ChatCompletionRequest(
                        model = ModelId("gpt-3.5-turbo"),
                        messages =
                                listOf(
                                        ChatMessage(role = ChatRole.System, content =INSTRUCTIONS
                                                    ),

                                )
                )

        val completion: ChatCompletion = openai.chatCompletion(chatCompletionRequest)
        return completion.choices.last().message.content ?: ""
    }
}
