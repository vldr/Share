extern crate prost_build;

fn main() {
    prost_build::compile_protos(&["cli/protobuf/packets.proto"], &["cli/"]).unwrap();
}
