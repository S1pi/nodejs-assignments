// Dummy mock data
const mediaItems = [
  {
    media_id: 9632,
    filename: 'ffd8.jpg',
    filesize: 887574,
    title: 'Carrot',
    description: 'Nice carrot',
    user_id: 1606,
    media_type: 'image/jpeg',
    created_at: '2023-10-16T19:00:09.000Z',
  },
  {
    media_id: 9626,
    filename: 'dbbd.jpg',
    filesize: 60703,
    title: 'Miika',
    description: 'My Photo',
    user_id: 3671,
    media_type: 'image/jpeg',
    created_at: '2023-10-13T12:14:26.000Z',
  },
  {
    media_id: 9625,
    filename: 'cat2.png',
    filesize: 30635,
    title: 'Aksux',
    description: 'friends',
    user_id: 260,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T20:03:08.000Z',
  },
  {
    media_id: 9592,
    filename: 'f504.jpg',
    filesize: 48975,
    title: 'Desert',
    description: '',
    user_id: 3609,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:59:05.000Z',
  },
  {
    media_id: 9590,
    filename: '60ac.jpg',
    filesize: 23829,
    title: 'Basement',
    description: 'Light setup in basement',
    user_id: 305,
    media_type: 'image/jpeg',
    created_at: '2023-10-12T06:56:41.000Z',
  },
];

const getItems = (res) => {
  res.json(mediaItems);
};

const postItem = (req, res) => {
  console.log('post req body', req.body);
  const newItem = req.body;
  newItem.media_id = mediaItems[mediaItems.length - 1].media_id + 1;
  mediaItems.push(newItem);
  res.status(201).json({message: 'Item added', id: newItem.id});
};

const getItemById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = mediaItems.find((item) => item.media_id === id);
  if (item) {
    if (req.query.format === 'plain') {
      res.send(item.title);
    } else {
      res.json(item);
    }
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

const modifyMediaItem = (req, res) => {
  const id = parseInt(req.params.id);
  const newBody = req.body;
  console.log('New body: ', newBody);
  // Vaihtoehto 1
  // const mediaItem = mediaItems.find((item) => item.media_id === id);
  // if (mediaItem) Object.assign(mediaItem, newBody);

  // Toinen vaihtoehto (korvaa suoraan uudella objectilla vanhan)
  const itemIndex = mediaItems.findIndex((item) => item.media_id === id);
  if (itemIndex !== -1) {
    mediaItems[itemIndex] = {...mediaItems[itemIndex], ...newBody};
    res.status(200).json({
      message: 'Media item updated!',
      updatedItem: mediaItems[itemIndex],
    });
  } else {
    res.status(404).json({message: 'Media item not found'});
  }
};

const deleteMedia = (req, res) => {
  const id = parseInt(req.params.id);
  const index = mediaItems.findIndex((item) => item.media_id === id);
  if (index !== -1) {
    mediaItems.splice(index, 1);
    res.status(200).json('Item removed succesfully!');
  } else {
    res.status(404).json(`Media item: ${req.params.id}; don't exist`);
  }
};

export {
  getItems,
  postItem,
  getItemById,
  modifyMediaItem,
  deleteMedia,
  mediaItems,
};
