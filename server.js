const puppeteer = require('puppeteer');
const template = `
<!DOCTYPE HTML>
<html>
<head>  
<script>
window.onload = function () {

var chart = new CanvasJS.Chart("chartContainer", {
	title:{
		text: "Music Album Sales by Year"
	},
	axisY: {
		title: "Units Sold",
		valueFormatString: "#0,,.",
		suffix: "mn",
		stripLines: [{
			value: 3366500,
			label: "Average"
		}]
	},
	data: [{
		yValueFormatString: "#,### Units",
		xValueFormatString: "YYYY",
		type: "spline",
		dataPoints: [
			{x: new Date(2002, 0), y: 2506000},
			{x: new Date(2003, 0), y: 2798000},
			{x: new Date(2004, 0), y: 3386000},
			{x: new Date(2005, 0), y: 6944000},
			{x: new Date(2006, 0), y: 6026000},
			{x: new Date(2007, 0), y: 2394000},
			{x: new Date(2008, 0), y: 1872000},
			{x: new Date(2009, 0), y: 2140000},
			{x: new Date(2010, 0), y: 7289000},
			{x: new Date(2011, 0), y: 4830000},
			{x: new Date(2012, 0), y: 2009000},
			{x: new Date(2013, 0), y: 2840000},
			{x: new Date(2014, 0), y: 2396000},
			{x: new Date(2015, 0), y: 1613000},
			{x: new Date(2016, 0), y: 2821000},
			{x: new Date(2017, 0), y: 2000000}
		]
	}]
});
chart.render();

}
</script>
</head>
<body>
<div id="chartContainer" style="height: 300px; width: 100%;"></div>
<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
</body>
</html>
`;

const takeScreenShot = async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = {
    path: 'server/img/website.png',
    omitBackground: true,
    fullPage: true
  };
  await page.goto(req.headers.hostname);
  await page.screenshot(options);

  await browser.close();
  res.send('Done');
};

const createPdf = async () => {
  const obj = [
    {
      date: new Date(2018, 3, 20),
      value: 90
    },
    {
      date: new Date(2018, 3, 21),
      value: 102
    },
    {
      date: new Date(2018, 3, 22),
      value: 65
    },
    {
      date: new Date(2018, 3, 23),
      value: 62
    },
    {
      date: new Date(2018, 3, 24),
      value: 55
    },
    {
      date: new Date(2018, 3, 25),
      value: 81
    }
  ];
  // const chartData = `${JSON.stringify(obj)}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const options = {
    path: 'server/pdf/website.pdf',
    format: 'A4'
  };
  await page.setContent(
    template,
    {
      waitUntil: 'networkidle0'
    }
  );
  await page.pdf(options);

  await browser.close();

  // res.send('Done');
};


createPdf();
