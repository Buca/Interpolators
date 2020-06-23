export class BiGussianRDF {

	public vertices: Float32Array;
	public axis: u32 = 2;

	public shape: f32 = 1;

	constructor(
		
		shape: f32,
		vertices: Float32Array 

	) {

		this.shape = shape;
		this.vertices = vertices;

	};

	public solve(): BiGussianRDF {

		return this;

	};

	public get( x: f32, y: f32 ): f32 {

		let sum: f32 = 0;

		for( let i: u32 = 0; i !== this.vertices.length; i += 3 ) {

			let distanceSq: f32 = ( x - this.vertices[ i ] ) ** 2 + ( y - this.vertices[ i + 1 ] ) ** 2;

			sum += this.vertices[ i + 2 ] * Mathf.exp( -( ( this.shape ** 2 ) * distanceSq ) );

		}

		return sum;

	};

};