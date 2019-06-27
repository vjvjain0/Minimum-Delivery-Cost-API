config={}

config.graph=[[0,4,Infinity,3],
	      [4,0,3,2.5],
	      [Infinity,3,0,2],
	      [3,2.5,2,0]];

config.fixedRate = 10;
config.limit = 5;
config.variableRate = 8;
config.postLimit = 5;

module.exports = config;
