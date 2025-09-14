use('librarySU')
db.books.insertMany([
    { title: "Clean Code", author: "Robert C. Martin", genre: "Software Engineering", year: 2008, pages: 464, publisher: "Prentice Hall" },
    { title: "The Pragmatic Programmer", author: "Andy Hunt", genre: "Software Development", year: 1999, pages: 352, publisher: "Addison-Wesley" },
    { title: "Introduction to Algorithms", author: "Cormen et al.", genre: "Algorithms", year: 2009, pages: 1312, publisher: "MIT Press" },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", genre: "Databases", year: 2017, pages: 616, publisher: "O’Reilly" },
    { title: "Structure and Interpretation of Computer Programs", author: "Abelson & Sussman", genre: "Programming", year: 1996, pages: 657, publisher: "MIT Press" },
    { title: "Refactoring", author: "Martin Fowler", genre: "Software Development", year: 2018, pages: 448, publisher: "Addison-Wesley" },
    { title: "Code Complete", author: "Steve McConnell", genre: "Software Engineering", year: 2004, pages: 960, publisher: "Microsoft Press" },
    { title: "The Art of Computer Programming", author: "Donald Knuth", genre: "Algorithms", year: 1968, pages: 672, publisher: "Addison-Wesley" },
    { title: "Cracking the Coding Interview", author: "Gayle Laakmann McDowell", genre: "Interview Prep", year: 2015, pages: 687, publisher: "CareerCup" },
    { title: "The Mythical Man-Month", author: "Fred Brooks", genre: "Project Management", year: 1975, pages: 336, publisher: "Addison-Wesley" }
  ]
   )