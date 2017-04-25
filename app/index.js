"use strict";

var Generator = require("yeoman-generator");
var chalk = require("chalk");
var yosay = require("yosay");
var superb = require("superb");
var mkdirp = require("mkdirp");
var validator = require("validator");

module.exports = class extends Generator {
    prompting() {

        this.log(yosay(
            "Welcome to " + superb() + " java-bones!\n " +
            "I'll walk you through the installation."
        ));

        return this.prompt([{
            type: "input",
            name: "user",
            message: "What\'s your name",
            default: "user"
        }, {
            type: "input",
            name: "email",
            message: "What\'s your email adress?",
            default: "user@noreply.com",
            validate: function (input) {
                return validator.isEmail(input);
            }
        }, {
            type: "input",
            name: "artifactID",
            message: "What\'s the artifactID?",
            default: "emptyproject4j"
        }, {
            type: "input",
            name: "groupID",
            message: "What\'s the groupID?",
            default: "net.groupID"
        }, {
            type: "input",
            name: "desc",
            message: "How would you describe the project in a single sentence?",
            default: "description"
        }, {
            type: "input",
            name: "githubuser",
            message: "What\'s your github user name?",
            default: "githubuser"
        }]).then((answers) => {
            this.args = answers;
            this.config.set(this.args);
        });
    }

    writing() {

        var grpid = this.args.groupID.split(".");

        this.fs.copyTpl(
            this.templatePath("run.sh"),
            this.destinationPath(this.args.artifactID), {
                artifactID: this.args.artifactID,
            });

        var cpyt = [
            "pom.xml", "README.md", "TODO.md", "VERSIONS.md",
            "build.sh", "LICENSE", "config"
        ];
        for (var i in cpyt) {
            this.fs.copyTpl(
                this.templatePath(cpyt[i]),
                this.destinationPath(cpyt[i]), {
                    githubuser: this.args.githubuser,
                    artifactID: this.args.artifactID,
                    groupID: this.args.groupID,
                    desc: this.args.desc,
                    email: this.args.email,
                    user: this.args.user
                });
        }

        this.fs.copyTpl(
            this.templatePath("Main.java"),
            this.destinationPath(
                "./src/main/java/" + grpid[0] + "/" + grpid[1] +
                "/" + this.args.artifactID + "/Main.java"), {
                artifactID: this.args.artifactID,
                groupID: this.args.groupID,
                desc: this.args.desc,
                email: this.args.email,
                user: this.args.user
            });

        this.fs.copyTpl(
            this.templatePath("TestSuite.java"),
            this.destinationPath(
                "./src/test/java/" + grpid[0] + "/" +
                grpid[1] + "/tests/" + this.args.artifactID + "/TestSuite.java"), {
                artifactID: this.args.artifactID,
                groupID: this.args.groupID,
                desc: this.args.desc,
                email: this.args.email,
                user: this.args.user
            });


        var bcpy = [
          "codecov.yml", "gitignore", "gitattributes", "travis.yml"
        ];
        for (var i in bcpy) {
            this.fs.copy(
                this.templatePath(bcpy[i]),
                this.destinationPath("." + bcpy[i]));
        }
    }

    end() {
        this.config.save();
    }
};
