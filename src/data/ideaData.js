const ideaData = [
    {
      id: 1,
      title: 'AI-Powered Research Assistant for Academic Papers',
      description: 'Developing an AI tool that helps researchers find relevant papers, summarize content, and identify research gaps...',
      tags: ['#Research', '#Technology'],
      author: 'John Doe',
      date: '2023-10-15T10:30:00Z',
      status: 'In Progress',
      popularity: 245,
      comments: [
        {
          id: 101,
          author: 'Jane Smith',
          content: 'This sounds like a game-changer for the research community!',
          replies: [
            {
              id: 201,
              author: 'John Doe',
              content: 'Glad you think so!',
              replies: [],
            },
          ],
        },
        {
          id: 102,
          author: 'Alice Johnson',
          content: 'How do you plan to handle data privacy?',
          replies: [],
        },
      ],
    },
    {
      id: 2,
      title: 'Community Mentorship Program',
      description: 'Creating a structured mentorship program connecting experienced researchers with newcomers...',
      tags: ['#Community', '#Education'],
      author: 'Jane Smith',
      date: '2023-10-10T08:15:00Z',
      status: 'Proposed',
      popularity: 182,
      comments: [
        {
          id: 103,
          author: 'Bob Brown',
          content: 'This initiative will greatly benefit new researchers.',
          replies: [],
        },
      ],
    },

    {
        id: 3,
        title: 'Smart Lab Equipment Management System',
        description: 'An integrated system to monitor and manage lab equipment usage, maintenance schedules, and inventory...',
        tags: ['#Management', '#Automation'],
        author: 'Alice Johnson',
        date: '2023-10-20T12:00:00Z',
        status: 'Proposed',
        popularity: 210,
        comments: [
            {
                id: 104,
                author: 'Charlie Davis',
                content: 'This could streamline lab operations significantly.',
                replies: [],
            },
        ],
    },
    {
        id: 4,
        title: 'Virtual Reality Conference Platform',
        description: 'Developing a VR platform for hosting academic conferences, enabling immersive presentations and networking...',
        tags: ['#VR', '#Events'],
        author: 'Bob Brown',
        date: '2023-10-18T09:45:00Z',
        status: 'In Progress',
        popularity: 198,
        comments: [
            {
                id: 105,
                author: 'Dana Lee',
                content: 'VR conferences could increase accessibility for many researchers.',
                replies: [],
            },
        ],
    },
    // Add more mock ideas as needed
  ];
  
  export default ideaData;
  