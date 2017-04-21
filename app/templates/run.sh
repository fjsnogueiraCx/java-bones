#!/bin/bash

if [ ! -f  "target/<%= artifactID %>-standalone.jar" ]
then
    mvn clean package
fi

java -jar target/<%= artifactID %>-standalone.jar
