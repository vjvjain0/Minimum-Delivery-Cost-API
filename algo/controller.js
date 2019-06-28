const config = require('../config');

let minCost,vis,dist;

let flag=0;

let calculateCost = (req,res)=>{
	dist = floydWarshall();
	let w = new Array(3);
	w[0]=w[1]=w[2]=0;

	if(req.query.A) w[0] += parseInt(req.query.A);
	if(req.query.B) w[0] += parseInt(req.query.B);
	if(req.query.C) w[0] += parseInt(req.query.C);

	if(req.query.D) w[1] += parseInt(req.query.D);
	if(req.query.E) w[1] += parseInt(req.query.E);
	if(req.query.F) w[1] += parseInt(req.query.F);

	if(req.query.G) w[2] += parseInt(req.query.G);
	if(req.query.H) w[2] += parseInt(req.query.H);
	if(req.query.I) w[2] += parseInt(req.query.I);

	vis = new Array(4);
	for(let i=0;i<3;i++)
		if(w[i]>0)
			vis[i]=false;
		else
			vis[i]=true;
	vis[3]=false;

	minCost = Infinity;

	for(let i=0;i<3;i++)
	{
		if(vis[i])
			continue;
		vis[i]=true;
		// console.log(i);
		findSequence(w,w[i],0,i);
		vis[i] = false;
	}

	console.log(minCost);

	res.status(200).send({"minCost" : minCost});
}

let findSequence = (w,tweight,tcost,j) =>{

	let f=true;
	for(let i=0;i<4;i++)
	{
		if(vis[i] || i==j)
			continue;
		let extraWeight = Math.max(0,tweight-config.limit);
		let cost = dist[j][i]*(config.fixedRate+config.variableRate*Math.ceil(extraWeight/config.postLimit));
		tcost += cost;
		if(tcost>minCost)
			return;
		if(i==3)
		{
			if(f)
			{
				if(minCost>tcost)
					minCost = tcost;
			}
			else
				findSequence(w,0,tcost,i);
		}
		else
		{
			f=false;
			tweight += w[i];
			vis[i] = true;
			findSequence(w,tweight,tcost,i);
			tweight -= w[i];
			tcost -= cost;
			vis[i] = false;
		}
	}
}

let floydWarshall = () =>{
	let graph = config.graph;
	for(let k=0;k<3;k++)
	{
		for(let i=0;i<3;i++)
		{
			for(let j=0;j<3;j++)
				if(graph[i][k] + graph[k][j] < graph[i][j])  
                    graph[i][j] = graph[i][k] + graph[k][j]; 
		}
	}

	return graph;
}

module.exports = calculateCost