# Hhbuilder

Your application needs a way to capture information about a household applying
for health insurance coverage. Develop a UI for building a household up from
individual people.

## Task

You have been given an HTML page with a form and a placeholder for displaying
a household.

In the given index.js file, replace the "Your code goes here" comment with JavaScript that can:

- Validate data entry (age is required and > 0, relationship is required)
- Add people to a growing household list
- Remove a previously added person from the list
- Display the household list in the HTML as it is modified
- Serialize the household as JSON upon form submission as a fake trip to the server

## Notes

Don't modify the given index.html file in any way. You're of course still allowed to modify the DOM through Javascript.

You must write JavaScript, not a language that compiles down to JavaScript. You
must use ES3 or ES5/5.1 standard. Assume the capabilities of a modern
mainstream browser in wide use, i.e., no bleeding-edge features. No 3rd party
libraries — i.e., no jQuery.

The display of the household list is up to you.

On submission, put the serialized JSON in the provided "debug" DOM element and display that element.

After submission, the user should be able to make changes and submit the household again.

You don't need to add validations around anything other than the age and relationship requirements described above. It's ok for someone to add 35 parents.

The focus here is on the quality of your JavaScript, not the beauty of your design. The controls you add around viewing and deleting
household members should be usable but need not be much to look at.

# Next Steps

This project would take me more than 3 hours to complete, as most of my javascript experience involves debugging or adding to others' code, rather that starting my own projects from scratch. I had also never come across the subject of modifying HTML DOM using javascript.

If I had more time, I would

1.  Make the user experience more human by fixing the field validation features so that they aren't immediately triggered as soon as form is reset.
2.  Serialize the user input into a JSON for submitForm function. This would probably require creating a `householdList` Object to capture all the data added. Right now the data is not saved anywhere.
3.  Ensure that code is accessible. If I already knew the accessibility requirements for HTML, this would be a first priority and I would incorporate it as I coded.
4.  Add some minimal styling.
5.  Only add 'smoker' to family member entry if person is a smoker.
