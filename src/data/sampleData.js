// Import assets
import welcomeImg from '../assets/Welcome to Monumental Times.png';
import girlSeaImg from '../assets/Girl by the Seaside.png';
import shadowImg from '../assets/Sh adow of th e Almigh ty.png';
import spiritualImg from '../assets/Spiritual Article.png';
import recipe1Img from '../assets/recipe1.png';
import recipe2Img from '../assets/recipe2.png';
import recipe3Img from '../assets/recipe3.png';

// Monumental Times - October 18th, 2025 Issue
export const sampleArticles = [
  {
    id: 1,
    title: "Welcome to Monumental Times!",
    summary: "You have happened upon the inaugural issue of a new, up-and-coming newspaper filled with all your favorite things – stories, testimonies, quotes, laughs, and more!",
    author: "Hope Hanson",
    timestamp: new Date('2025-10-13T08:00:00'), // October 13th, 2025
    image: spiritualImg,
    category: "Opinion/Testimony",
    readTime: 5,
    isBreaking: true,
    content: `Throughout the Bible, God has always emphasized the importance of remembering. He commanded the Israelites to set up monuments of stone to mark significant moments in their history (Joshua 4:1-24). He reminded them time and time again to write scripture on our hearts (Jeremiah 31:33). Much of the Bible itself is full of historical accounts reminding us of God's work throughout the ages.

Amy Carmichael, missionary to India in the early 1900s, recognized how important this was. When she still lived in Ireland and England, she published a small magazine called "Scraps" to remind family and friends of spiritual truths. Looking back at "Scraps" is one of the ways we can look into the life of the missionary and see how God brought her from there to eventually impacting so many lives in India.

This newspaper began with that same vision in mind: remembering what God has done. Far too often in our busy lives we forget to remember the things God is working all around us. In this publication you will find that everything written or created has that driving purpose behind it: Remember! It is a call to be intentional, to write down and record in our own "piles of stones" what our Father in heaven is doing among His children... those Monumental moments in our lives.`
  },
  {
    id: 2,
    title: "A Wild Tail: The Raccoon Invasion of Japan",
    summary: "How a 1977 anime series based on a Wisconsin boy's memoir accidentally introduced an invasive species to Japan.",
    author: "Andrew Rocke",
    timestamp: new Date('2025-10-13T06:00:00'),
    image: welcomeImg, // Using welcome image as placeholder
    category: "Human interest",
    readTime: 6,
    content: `So, I'm the kind of person that when I watch a movie or hear about something that interests me, I'll often do a little online research to learn more about the topic. Recently, my wife and I watched the movie Rascal together. It is based on the book with a similar name.

Rascal: A Memoir of a Better Era was written by Sterling North in 1963. It is based on his childhood experience of raising a baby raccoon in Wisconsin during World War I. The book won several awards, and the movie was made in 1969. As I perused the Wikipedia article, I noticed that a Japanese anime series called Araiguma Rasukaru was based on the book and "was responsible for the accidental introduction of the raccoon into Japan."

A short internet search found a 2024 Fox News article entitled: "Japan grappling with invasive raccoon population." Sure enough, the 1977 anime called Rascal the Raccoon (in English) was responsible for the importation of raccoons as pets. As could be imagined, the Japanese owners discovered that raccoons don't make good pets.

So, history repeated itself and the Japanese did what Sterling had to do with his raccoon: they let them go in the wild.`
  },
  {
    id: 3,
    title: "On Prayer",
    summary: "Prayer is by far one of the most crucial aspects of the Christian life. How are we to know God, be transformed to be like Christ, or battle for Him, if we never talk to Him?",
    author: "Joanna Rocke",
    timestamp: new Date('2025-10-12T14:30:00'),
    image: spiritualImg,
    category: "Prayer",
    readTime: 4,
    content: `Prayer is by far one of the most crucial aspects of the Christian life. How are we to know God, be transformed to be like Christ, or battle for Him, if we never talk to Him? Indeed, half the battle is won when we put our lives into His hands instead of holding on to it ourselves. The lack of prayer reflects a false trust in ourselves. What a foolish choice!

Prayer requires us to come humbly before God. Psalm 139:23-24 is a great place to start as we humble ourselves and turn to God. As you pray in the next weeks, pray this scripture and allow God to convict you of sin and restore you to truth. I have found praying this scripture frequently to be a good reminder of my condition, God's love, and my need for Him.

"Search me, O God, and know my heart; try me, and know my anxieties; and see if there is any wicked way in me, and lead me in the way everlasting." - Psalm 139:23-24`
  },
  {
    id: 4,
    title: "A Girl by the Seaside",
    summary: "She ran along the shore, a squeal of delight escaping her lips at every shell she came upon. A heartwarming story about childhood wonder and God's treasures.",
    author: "Hope Hanson",
    timestamp: new Date('2025-10-11T10:15:00'),
    image: girlSeaImg,
    category: "Stories",
    readTime: 3,
    content: `She ran along the shore, a squeal of delight escaping her lips at every shell she came upon. One chubby fist held the edge of her blue skirt in a bundle, creating a little pouch to hold her treasures. Silver shells, white shells, blue shells, perfect shells, soft shells, big shells, small shells. Broken shells too. All slipped into the makeshift bag.

She sat upon the sun warmed beach, wiggling her toes in the soft sand. One by one, she laid the shells out on the ground as the icy cold waves leapt against the shore of Lake Michigan a little ways in front of her. Her rosy cheeks spread in a wide, contented smile. A gusty wind blew across her face, whipping stray blond hairs wildly like the brown and green grasses around her.

She wishes for a shell to find along the golden sand, a treasure with worth beyond all measure to hold within her hand. A child's treasure in a shell is greater than a miser's gold, for God made shells and trees and grass - real treasures to behold. But even these cannot compare to God's ultimate treasure: Eternity with Him above and joy beyond all measure!`
  },
  {
    id: 5,
    title: "Shadow of the Almighty: Book Review",
    summary: "Elisabeth Elliot masterfully compiled letters and journal entries from Jim Elliot throughout his life in this inspiring biography of faith and sacrifice.",
    author: "Hope Hanson",
    timestamp: new Date('2025-10-10T16:45:00'),
    image: shadowImg,
    category: "Book review",
    readTime: 7,
    content: `I have grown up reading the stories and adventures of the 5 missionaries who travelled to Ecuador in the 1950s and risked all to carry the gospel to the unreached Huaorani (formerly Auca) people. Jim Elliot and his four friends Nate Saint, Ed McCully, Pete Fleming, and Roger Youderian were all killed by the spear on January 8, 1956, and this tragedy paved the way for the people in the remote jungles of Ecuador to hear the gospel and has inspired countless others to pursue mission work in various capacities since then.

When I first "picked up" the audiobook of Shadow of the Almighty, I wasn't exactly sure what to expect. Since I already knew some of the story, I figured I might hear a lot of the same. But this book is far from run-of-the-mill. Elisabeth Elliot masterfully compiled letters and journal entries from Jim Elliot throughout his life, starting in his teens.`
  },
  {
    id: 6,
    title: "I Give You Lord My All",
    summary: "A beautiful poem reflecting on faith, trust, and surrender to God's will through life's storms and seasons.",
    author: "Hannah Rocke",
    timestamp: new Date('2025-10-09T12:20:00'),
    image: spiritualImg, // Using spiritual image as placeholder
    category: "Poetry",
    readTime: 2,
    content: `You meet me in the quiet lonely places
Where the rain falls down like dust
You whisper songs of comfort
And quiet words of trust

You conquer every lie with truth
And cast aside my fear
And when I am at my loneliest
Is when You, Lord, appear

My heart is in Your hands, my Lord
My life is at Your call
Make my desires only Yours
I give You, Lord, my all

The howling wind and pouring rain
Falls down hard and fast
But Lord You promise deliverance
And perfect joy at last

I wait for You, for in Your time
You weave a kingdom song
In every pause and every note
Your melody grows strong

In the while, in this world
There will be tears and pain
There will be suffering and loss
But He will come again

And so, my patient longing lasts
But one day it will cease
In fellowship with You at last
And everlasting peace`
  },
  {
    id: 7,
    title: "Book Challenge: Keep a Reading Journal",
    summary: "Do you ever wonder how many books you've read in your lifetime? Here's a simple challenge to help you track and remember your reading journey.",
    author: "Hope Hanson",
    timestamp: new Date('2025-10-08T15:30:00'),
    image: shadowImg, // Using book image
    category: "How to (sewing, art, etc.)",
    readTime: 3,
    content: `Do you ever wonder how many books you've read in your lifetime? Or perhaps you can't remember the name of that really good book you finished last year and you can't find it again. Whatever the case is, there is an easy solution!

My challenge to you is to keep a book journal. Every time you finish a book, write down the Title and Author. For an extra bonus, write down your thoughts on the book! Other things to include could be the length of the book, genre, time it took you to finish it, or who recommended it to you. Be creative!

In the years to come, it will be fun to look back and see what you've read and how your reading habits have changed through the years. It's also fun to keep track of how many books you read in a year! My record was 66, maybe you can beat it!

Whatever you do, put your own special spin on it and have fun. Happy reading!`
  },
  {
    id: 8,
    title: "For Laughs: Clean Comedy Corner",
    summary: "A collection of wholesome jokes and puns to brighten your day, including Switzerland's big plus and sticky situations!",
    author: "Editorial Staff",
    timestamp: new Date('2025-10-07T11:45:00'),
    image: welcomeImg, // Using welcome image
    category: "Humor",
    readTime: 1,
    content: `What's the best thing about Switzerland? No idea, but their flag is a big plus.

What's brown and sticky? A stick.

Why did the can crusher quit his job? Because it was soda pressing.

Did you know the English word "run" has 645 definitions? I'd like the run down on those!`
  },
  {
    id: 9,
    title: "Recipe Collection: Family Favorites",
    summary: "Three delicious recipes perfect for family gatherings and special occasions, featuring comfort food classics with a homemade touch.",
    author: "Editorial Staff",
    timestamp: new Date('2025-10-06T09:15:00'),
    image: recipe1Img,
    category: "Recipes",
    readTime: 5,
    content: `Discover three wonderful recipes that have been family favorites for generations. These comfort food classics are perfect for bringing loved ones together around the dinner table.`
  },
  {
    id: 10,
    title: "Voices from History: Timeless Quotes",
    summary: "Inspirational quotes from Jim Elliot, Corrie ten Boom, A.W. Tozer, and other faithful servants who remind us of God's enduring love and faithfulness.",
    author: "Editorial Staff",
    timestamp: new Date('2025-10-05T13:00:00'),
    image: spiritualImg, // Using spiritual image
    category: "Quotes",
    readTime: 2,
    content: `"God always gives His best to those who leave the choice with Him." - Jim Elliot

"Today I know that such memories are the key not to the past, but to the future. I know that the experiences of our lives, when we let God use them, become the mysterious and perfect preparation for the work he will give us to do." - Corrie ten Boom

"The love of God is one of the great realities of the universe, a pillar upon which the hope of the world rests. But it is a personal, intimate thing, too. God does not love populations, He loves people. He loves not masses, but men. He loves us all with a mighty love that has no beginning and can have no end." - A.W. Tozer

"A life abandoned to God cannot be cut short. 'Cut short' means not complete, interrupted, and we know that our Master does no half-way jobs." - Sherwood Day`
  }
];

export const featuredArticle = sampleArticles[0];

export const secondaryArticles = sampleArticles.slice(1, 7);

export const sidebarArticles = sampleArticles.slice(7);