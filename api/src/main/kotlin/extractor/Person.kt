package io.github.carolinewtuftin.extractor

import kotlinx.serialization.Serializable

@Serializable
data class Person(
    val ssn: String,
    val firstName: String,
    val lastName: String,
)
