export class GussianRDF {

	public vertices: Float32Array;
	public axis: u32 = 1;

	public shape: f32 = 1;

	constructor(
	
		shape: f32,
		vertices: Float32Array 

	) {

		this.shape = shape;
		this.vertices = vertices;

	};

	public solve(): GussianRDF {

		return this;

	};

	public get( x: f32 ): f32 {

		let sum: f32 = 0;

		for( let i: u32 = 0; i !== this.vertices.length; i += 2 ) {

			sum += this.vertices[ i + this.axis ] * Mathf.exp( -( ( this.shape * Mathf.abs( x - this.vertices[ i + ( 1 - this.axis ) ] ) ) ** 2 ) );

		}

		return sum;

	};

};