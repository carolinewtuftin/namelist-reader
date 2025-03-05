package io.github.carolinewtuftin

import io.github.carolinewtuftin.extractor.Person
import kotlinx.serialization.Serializable

@Serializable
data class Response(
    val inputString: String,
    val extractedPersons: List<Person>,
)
