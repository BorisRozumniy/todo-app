// import img1 from './img1.png';
// import img2 from './img2.png';
// import img3 from './img3.png';

export const mockArticles = [
  {
    id: '1',
    title: 'Step-by-Step Guide on How to Create an Electronic Signature',
    image: './img1.png',
  },
  {
    id: '2',
    title: 'Expert Tips on How to Sign a PDF Online in 2022',
    image: './img2.png',
  },
  {
    id: '3',
    title:
      'Everything You Need to Know About Electronic Signature Everything You…',
    image: './img3.png',
  },
];

const genMockBlogs = (initArr, iteration) => {
  let arr = [...initArr];
  let result = [...initArr];
  while (iteration) {
    arr.push(arr.shift());
    result = [...result, ...arr];
    iteration--;
  }
  return result;
};

export const blogArticles = JSON.parse(
  JSON.stringify(genMockBlogs(mockArticles, 500)),
).map((item, i) => {
  item.id = i + '';
  return item;
});
