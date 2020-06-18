<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChartDataModel extends Model
{
    protected $table = 'chart_data';
    protected $primarykey = 'id';
    public $incrementing = true;
    protected $keytype = 'int';
    public $timestamps = false;
}
