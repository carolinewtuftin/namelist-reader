package io.github.carolinewtuftin.extractor

class NamelistExtractor {

    fun extractPersons(input: String): List<Person> {
        return listOf(
            Person(ssn = "12345678900", firstName = "Ola", "Nordmann"),
            Person(ssn = "12345678901", firstName = "Olga", "Boie"),
            Person(ssn = "12345678902", firstName = "Rolf Geir", "Burud")
        )
    }

}