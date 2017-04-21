/**
 * <%= artifactID %>: <%= desc %>
 * <p>
 * Copyright (C) <%= user %>
 * <p>
 * This file is part of <%= artifactID %>.
 * <p>
 * <%= artifactID %> is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * <p>
 * <%= artifactID %> is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * <p>
 * You should have received a copy of the GNU General Public License
 * along with <%= artifactID %>. If not, see <http://www.gnu.org/licenses/>.
 */


package <%= groupID %>.tests.<%= artifactID %>;

import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;


/**
 * @author <%= user %> {@literal <%= email %>}
 */
@RunWith(Suite.class)
@Suite.SuiteClasses({})
public class TestSuite
{
    @BeforeClass
    public static void setup()
    {
        org.apache.log4j.ConsoleAppender appender = new org.apache.log4j.ConsoleAppender();
        appender.setWriter(new java.io.OutputStreamWriter(java.lang.System.out));
        appender.setLayout(new org.apache.log4j.PatternLayout("%-5p [%t]: %m%n"));
        org.apache.log4j.Logger.getRootLogger().addAppender(appender);
    }
}
