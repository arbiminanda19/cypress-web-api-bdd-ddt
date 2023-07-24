Feature: Login

  Scenario Outline: Login with Data Input
    Given user on login page
    When user input "<username>" as username
    And user input "<password>" as password
    And user click submit button
    Then user verify status login result

    Examples:
      | username | password |
      | Admin    | admin123 |