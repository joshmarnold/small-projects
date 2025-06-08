export const seedData = {
  users: [
    {
      id: "1",
      username: "alexrivera",
      name: "Alex Rivera",
      email: "alex@example.com",
      password: "password123",
      description: "Photographer & Wanderer 📸🌍 Capturing moments.",
      avatarUrl:
        "https://images.unsplash.com/photo-1743674445265-b311b0ba8118?w=200&h=200&fit=crop&auto=format",
      online: true,
      followers: ["2", "3"],
      following: ["4", "5"],
    },
    {
      id: "2",
      username: "miachen",
      name: "Mia Chen",
      email: "mia@example.com",
      password: "password123",
      description: "",
      avatarUrl:
        "https://images.unsplash.com/profile-1748905621229-43136255fcd1image?w=150&dpr=2&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      online: true,
      followers: ["1"],
      following: [],
    },
    {
      id: "3",
      username: "samthompson",
      name: "Sam Thompson",
      email: "sam@example.com",
      password: "password123",
      description: "",
      avatarUrl:
        "https://images.unsplash.com/profile-1726003230721-a0d0a95751d4image?w=150&dpr=2&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      online: true,
      followers: ["1"],
      following: [],
    },
    {
      id: "4",
      username: "chloedavis",
      name: "Chloe Davis",
      email: "chloe@example.com",
      password: "password123",
      description: "",
      avatarUrl:
        "https://plus.unsplash.com/premium_photo-1747861981486-05f2969c8f58?w=200&h=200&fit=crop&auto=format",
      online: true,
      followers: [],
      following: ["1"],
    },
    {
      id: "5",
      username: "sarahcarter",
      name: "Sarah Carter",
      email: "sarah@example.com",
      password: "password123",
      description: "",
      avatarUrl:
        "https://images.unsplash.com/profile-1724662947652-f269d453b430image?w=150&dpr=2&crop=faces&bg=%23fff&h=150&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      online: false,
      followers: [],
      following: ["1"],
    },
  ],

  posts: [
    {
      id: "post1",
      userId: "1",
      content:
        "Golden hour in the mountains! Absolutely breathtaking view today. #nature #photography #sunset",
      imageUrl:
        "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      likes: ["2", "3"],
      comments: [
        {
          id: "c1",
          userId: "2",
          text: "Amazing shot!",
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
        {
          id: "c2",
          userId: "3",
          text: "Love this!",
          createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "post2",
      userId: "1",
      content: "Cozy cabin mornings hit different. ☕🌲",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1734545294150-3d6c417c5cfb?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0",
      createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 1.5h ago
      likes: ["3"],
      comments: [],
    },
    {
      id: "post3",
      userId: "1",
      content: "Exploring London and soaking up every street detail. 🇬🇧🧥",
      imageUrl:
        "https://images.unsplash.com/photo-1748968218568-a5eac621e65c?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0",
      createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(), // ~1.15h ago
      likes: ["2", "5"],
      comments: [],
    },
    {
      id: "post4",
      userId: "1",
      content: "View from the cabin window. Nature always delivers. 🌿",
      imageUrl:
        "https://images.unsplash.com/photo-1749137598868-94bde1951944?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.1.0",
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45m ago
      likes: [],
      comments: [],
    },
  ],

  groups: [
    {
      id: "group1",
      name: "City Explorers Club 🌆",
      description: "Finding hidden gems in the city",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1747831949543-5595fe4f790e?w=100&h=100&fit=crop&auto=format",
      memberIds: ["1", "2", "3", "4"],
      messages: [
        {
          id: "msg1",
          userId: "2",
          text: "This is a great idea!",
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "msg2",
          userId: "1",
          text: "Glad you joined!",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "group2",
      name: "Foodie Finds 🍕🍔",
      description: "Share your favorite eats!",
      imageUrl:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=100&h=100&fit=crop&auto=format",
      memberIds: ["1", "3", "5"],
      messages: [
        {
          id: "group2_msg1",
          userId: "1",
          text: "This React hook is super helpful!",
          createdAt: "2025-06-08T16:23:28.956Z",
        },
        {
          id: "group2_msg2",
          userId: "5",
          text: "Let's share our favorite recipes!",
          createdAt: "2025-06-08T15:53:28.956Z",
        },
        {
          id: "group2_msg3",
          userId: "1",
          text: "Let's share our favorite recipes!",
          createdAt: "2025-06-08T15:23:28.956Z",
        },
        {
          id: "group2_msg4",
          userId: "1",
          text: "Can someone recommend a good pizza spot?",
          createdAt: "2025-06-08T14:53:28.956Z",
        },
        {
          id: "group2_msg5",
          userId: "5",
          text: "Don't forget the team meeting tomorrow.",
          createdAt: "2025-06-08T14:23:28.956Z",
        },
      ],
    },
    {
      id: "group3",
      name: "React Devs Hangout",
      description: "All about React.",
      imageUrl:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&auto=format",
      memberIds: ["1", "2", "3", "4"],
      messages: [
        {
          id: "group3_msg1",
          userId: "1",
          text: "We should do a group call soon.",
          createdAt: "2025-06-08T16:23:28.956Z",
        },
        {
          id: "group3_msg2",
          userId: "2",
          text: "Agree! It's been a while.",
          createdAt: "2025-06-08T15:53:28.956Z",
        },
        {
          id: "group3_msg3",
          userId: "3",
          text: "Hey, has anyone tried that new taco place?",
          createdAt: "2025-06-08T15:23:28.956Z",
        },
        {
          id: "group3_msg4",
          userId: "4",
          text: "That burger was amazing!",
          createdAt: "2025-06-08T14:53:28.956Z",
        },
        {
          id: "group3_msg5",
          userId: "1",
          text: "Can someone recommend a good pizza spot?",
          createdAt: "2025-06-08T14:23:28.956Z",
        },
      ],
    },
  ],

  directMessages: [
    {
      userIds: ["1", "4"] as [string, string],
      messages: [
        {
          id: "dm1",
          userId: "4",
          text: "Your mountain pics always inspire!",
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      userIds: ["1", "2"] as [string, string],
      messages: [
        {
          id: "dm2",
          userId: "1",
          text: "Thanks Mia! Appreciate it 😊",
          createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      userIds: ["1", "5"] as [string, string],
      messages: [
        {
          id: "dm3",
          userId: "1",
          text: "That sourdough looks professional!",
          createdAt: new Date(Date.now() - 17 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ],

  notifications: [
    {
      id: "n1",
      userId: "1",
      actorId: "2", // Mia
      type: "comment" as const,
      createdAt: new Date(Date.now() - 13 * 60 * 1000).toISOString(), // 13m ago
      read: false,
    },
    {
      id: "n2",
      userId: "1",
      actorId: "4", // Chloe
      type: "message" as const,
      createdAt: new Date(Date.now() - 43 * 60 * 1000).toISOString(), // 43m ago
      read: false,
    },
    {
      id: "n3",
      userId: "1",
      actorId: "2", // Mia
      type: "message" as const,
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1h ago
      read: false,
    },
    {
      id: "n4",
      userId: "1",
      actorId: "4", // Chloe
      type: "follow" as const,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
      read: true,
    },
    {
      id: "n5",
      userId: "1",
      actorId: "3", // Sam
      type: "like" as const,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2h ago
      read: false,
    },
  ],
};
