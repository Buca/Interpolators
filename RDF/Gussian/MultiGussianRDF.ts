export class MultiGussianRDF {

	public vertices: Float32Array;
	public dimension: u32;
	public shape: f32;

	constructor( 

		dimension: u32, 
		vertices: Float32Array 

	) {

		this.dimension = dimension;
		this.vertices = vertices;

	};

	public get( v: Float32Array ): f32 {

		let sum: f32 = 0;

		for( let i: u32 = 0; i !== this.vertices.length; i += this.dimension ) {

			let distanceSq: f32 = 0;

			for( let j: u32 = 0; j !== this.dimension; j ++ ) {

				distanceSq += ( v[ j ] - this.vertices[ i + j ] ) ** 2;

			}

			sum += this.vertices[ i + 3 ] * Mathf.exp( -( ( this.shape ** 2 ) * distanceSq ) );

		}

		return sum;

	};

};