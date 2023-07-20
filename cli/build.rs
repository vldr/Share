extern crate prost_build;

fn main() {
    prost_build::compile_protos(&["packets.proto"], &["protos"]).unwrap();
}
