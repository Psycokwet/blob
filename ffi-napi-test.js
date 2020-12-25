const ffi = require("ffi-napi");

var generatedFfiFunDeclaration = {
  webm: {
    FfiFunDeclaration: {
      BASS_WEBM_StreamCreateURL: ["int", []],
    },
    path: "./libbasswebm.so",
  },
  tags: {
    FfiFunDeclaration: {
      TAGS_GetVersion: ["int", []],
    },
    path: "./libtags.so",
  },
  flac: {
    FfiFunDeclaration: {
      BASS_FLAC_StreamCreateURL: [
        "int",
        ["string", "int", "int", "pointer", "pointer"],
      ],
    },
    path: "./libbassflac.so",
  },
};

function minimalBass(generatedFfiFunDeclaration) {
  const ffiFunDeclaration = {
    BASS_Init: ["bool", ["int", "int", "int", "int", "int"]],
    BASS_GetVersion: ["int", []],
    BASS_StreamCreate: ["int", ["int", "int", "int", "pointer", "int64"]],
    BASS_StreamCreateFile: ["int", ["bool", "string", "int64", "int64", "int"]],
    BASS_StreamCreateURL: [
      "int",
      ["string", "int", "int", "pointer", "pointer"],
    ],
    BASS_ChannelPlay: ["bool", ["int", "bool"]],
    BASS_ChannelStop: ["bool", ["int"]],
    BASS_ChannelPause: ["bool", ["int"]],
    BASS_ChannelGetPosition: ["int64", ["int", "int"]],
    BASS_ChannelSetPosition: ["bool", ["int", "int64", "int"]],
    BASS_ChannelGetLength: ["int64", ["int", "int"]],

    BASS_ChannelBytes2Seconds: ["double", ["int", "int64"]],
    BASS_ChannelSeconds2Bytes: ["int64", ["int", "double"]],
    BASS_ChannelGetLevel: ["int", ["int"]],
    BASS_ChannelRemoveSync: ["bool", ["int", "int"]],
    BASS_ChannelIsActive: ["int", ["int"]],
    BASS_ChannelSetAttribute: ["bool", ["int", "int", "float"]],
    BASS_ChannelGetAttribute: ["bool", ["int", "int", "pointer"]],
    BASS_ChannelSetSync: ["int", ["int", "int", "int64", "pointer", "pointer"]],
    BASS_ChannelSlideAttribute: ["bool", ["long", "long", "float", "long"]],
    BASS_ChannelIsSliding: ["bool", ["long", "long"]],
    BASS_ChannelGetDevice: ["int", ["int"]],
    BASS_ChannelSetDevice: ["bool", ["long", "long"]],
    BASS_StreamFree: ["bool", ["int"]],
    BASS_SetDevice: ["bool", ["int"]],
    BASS_SetVolume: ["bool", ["float"]],
    BASS_Start: ["bool", []],
    BASS_Stop: ["bool", []],
    BASS_Pause: ["bool", []],
    BASS_ErrorGetCode: ["int", []],
    BASS_Free: ["bool", []],
    BASS_GetCPU: ["float", []],
    BASS_GetDevice: ["int", []],
    BASS_ChannelGetTags: ["string", ["int", "int"]],
    BASS_SetConfig: ["bool", ["int", "int"]],
    BASS_GetConfig: ["int", ["int"]],
    BASS_Update: ["bool", ["int"]],
    BASS_ChannelUpdate: ["bool", ["int", "int"]],
    BASS_RecordFree: ["bool", []],
    BASS_RecordGetDevice: ["int", []],
    BASS_RecordGetInput: ["int", ["int", "float"]],
    BASS_RecordGetInputName: ["string", ["int"]],
    BASS_RecordInit: ["bool", ["int"]],
    BASS_RecordSetDevice: ["bool", ["int"]],
    BASS_RecordSetInput: ["bool", ["int", "int", "float"]],
    BASS_RecordStart: ["int", ["int", "int", "long", "pointer", "int64"]],
  };
  ffi.Library(
    new ffi.DynamicLibrary(
      "./libbass.so",
      ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL
    ),
    ffiFunDeclaration
  );

  for (let libname in generatedFfiFunDeclaration) {
    console.log("trying to set " + libname);
    ffi.Library(
      generatedFfiFunDeclaration[libname].path,
      generatedFfiFunDeclaration[libname].ffiFunDeclaration
    );
    console.log("Successfully set " + libname);
  }
}

minimalBass(generatedFfiFunDeclaration);
