<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class InformationEtcModel extends Model
{
    protected $table = 'information_etc';
    protected $primarykey = 'id';
    public $incrementing = true;
    protected $keytype = 'int';
    public $timestamps = false;
}
