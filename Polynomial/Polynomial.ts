export class Polynomial {

	public vertices: Float32Array;
	public coefficients: Float32Array;
	public axis: u32 = 1;	

	constructor( vertices: Float32Array ) {
		
		this.vertices = vertices;
		this.coefficients = new Float32Array( u32( .5 * this.vertices.length ) );

	};

	public solve(): Polynomial {

		return this;

	};

	public get( x: f32 ): f32 {

		let result: f32 = 0;

		for( let i: u32 = 0; i !== this.vertices.length; i += 2 ) {

			let product: f32 = 1;

			for( let j: u32 = 0; j !== this.vertices.length; j += 2 ) {

				if( j === i ) continue;

				product *= ( x - this.vertices[ j ] ) / ( this.vertices[ i ] - this.vertices[ j ] );

			}

			result += product * this.vertices[ i + 1 ];

		}

		return result;

	}

};